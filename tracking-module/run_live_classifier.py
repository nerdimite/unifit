import os
import argparse
from pprint import pprint
import cv2
from time import time
import math
import numpy as np
from scipy.spatial.distance import cosine
import mediapipe as mp
from pose_classification_utils import (
    FullBodyPoseEmbedder,
    PoseClassifier,
    EMADictSmoothing,
    RepetitionCounter
)
from pose_critic import PoseCritic

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose


def main(pose_classifier, pose_classification_filter, repetition_counter, exercise, count_state, pose_critic):

    cam = cv2.VideoCapture(0)

    num_frames = 0
    t1 = time()
    n = 1

    with mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
            model_complexity=1) as pose:

        while(True):

            # Capture the video frame
            # by frame
            ret, input_frame = cam.read()

            if ret:

                # Run pose tracker.
                input_frame = cv2.cvtColor(input_frame, cv2.COLOR_BGR2RGB)
                result = pose.process(image=input_frame)
                pose_landmarks = result.pose_landmarks

                if pose_landmarks is not None:
                    visibility = all(
                        [lmk.visibility > 0.5 for lmk in pose_landmarks.landmark])
                else:
                    visibility = False

                # Draw pose prediction.
                output_frame = input_frame.copy()
                if pose_landmarks is not None:
                    mp_drawing.draw_landmarks(
                        image=output_frame,
                        landmark_list=pose_landmarks,
                        connections=mp_pose.POSE_CONNECTIONS)

                # Display FPS

                display_frame = cv2.flip(
                    cv2.cvtColor(output_frame, cv2.COLOR_BGR2RGB), 1)

                if pose_landmarks is not None:
                    # Get landmarks.
                    frame_height, frame_width = output_frame.shape[0], output_frame.shape[1]
                    pose_landmarks = np.array([[lmk.x * frame_width, lmk.y * frame_height, lmk.z * frame_width]
                                               for lmk in pose_landmarks.landmark], dtype=np.float32)
                    assert pose_landmarks.shape == (
                        33, 3), 'Unexpected landmarks shape: {}'.format(pose_landmarks.shape)

                    # Classify the pose on the current frame.
                    pose_classification = pose_classifier(pose_landmarks)

                    # Smooth classification using EMA.
                    pose_classification_filtered = pose_classification_filter(
                        pose_classification)

                    # Count repetitions.
                    repetitions_count = repetition_counter(
                        pose_classification_filtered)

                    pose_state = sorted(
                        pose_classification_filtered.items(), key=lambda x: x[1])[-1][0]

                    cv2.putText(display_frame, f"Pose: {pose_classification_filtered}", (10, 50),
                                cv2.FONT_HERSHEY_PLAIN, 1.5,
                                (0, 255, 255) if pose_state == count_state else (0, 255, 0), 2)
                    cv2.putText(display_frame, f"Reps: {repetitions_count}", (10, 80),
                                cv2.FONT_HERSHEY_PLAIN, 1.5, (255, 0, 0), 2)

                    # Check Accuracy of Pose
                    is_correct, remarks = pose_critic(
                        exercise, pose_state, pose_landmarks)

                    cv2.putText(display_frame, f"Remarks: {is_correct, remarks}", (10, 110),
                                cv2.FONT_HERSHEY_PLAIN, 1.5,
                                (0, 255, 0) if is_correct else (0, 0, 255), 2)

                else:
                    # No pose => no classification on current frame.
                    pose_classification = None

                    # Still add empty classification to the filter to maintaing correct
                    # smoothing for future frames.
                    pose_classification_filtered = pose_classification_filter(
                        dict())
                    pose_classification_filtered = None

                    # Don't update the counter presuming that person is 'frozen'. Just
                    # take the latest repetitions count.
                    repetitions_count = repetition_counter.n_repeats

                    cv2.putText(display_frame, f"Visibility: {visibility}", (10, 50),
                                cv2.FONT_HERSHEY_PLAIN, 1.5,
                                (0, 0, 255) if not visibility else (0, 255, 0), 2)

                fps = num_frames / (time() - t1)
                cv2.putText(display_frame, f"FPS: {fps}", (10, 20),
                            cv2.FONT_HERSHEY_PLAIN, 1.3, (0, 0, 255), 2)

                # Display the resulting frame
                cv2.imshow('Pose Recorder', display_frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

                num_frames += 1

        cam.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        'Run the pose classifier on a live webcam feed')

    parser.add_argument('--exercise', '-e', type=str,
                        default='squats', help='Name of exercise')
    parser.add_argument('--count-state', '-c', type=str, default='squats_down',
                        help='State of the exercise to count for repetition_counter')

    args = parser.parse_args()

    pose_samples_folder = f'fitness_data/processed_train/{args.exercise}/csvs_out'

    # Initialize embedder.
    pose_embedder = FullBodyPoseEmbedder()

    pose_classifier = PoseClassifier(
        pose_samples_folder=pose_samples_folder,
        pose_embedder=pose_embedder,
        top_n_by_max_distance=30,
        top_n_by_mean_distance=10,
        axes_weights=(1., 1., 0.2))

    # Initialize EMA smoothing.
    pose_classification_filter = EMADictSmoothing(
        window_size=10,
        alpha=0.2)

    # Initialize counter.
    repetition_counter = RepetitionCounter(
        class_name=args.count_state,
        enter_threshold=6,
        exit_threshold=4)

    # Initialize PoseCritic
    pose_critic = PoseCritic()

    main(pose_classifier,
         pose_classification_filter,
         repetition_counter,
         args.exercise,
         args.count_state,
         pose_critic)
