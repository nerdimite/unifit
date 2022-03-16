import os
import argparse
import cv2
from time import time
import numpy as np
import mediapipe as mp
from pose_classification_utils import (
    FullBodyPoseEmbedder,
    PoseClassifier,
    EMADictSmoothing,
    RepetitionCounter,
    PoseClassificationVisualizer
)

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose


class_name = 'squats_down'
pose_samples_folder = 'fitness_data/processed_train/squats/csvs_out'

# Initialize embedder.
pose_embedder = FullBodyPoseEmbedder()

pose_classifier = PoseClassifier(
    pose_samples_folder=pose_samples_folder,
    pose_embedder=pose_embedder,
    top_n_by_max_distance=30,
    top_n_by_mean_distance=10)

# Initialize EMA smoothing.
pose_classification_filter = EMADictSmoothing(
    window_size=10,
    alpha=0.2)

# Initialize counter.
repetition_counter = RepetitionCounter(
    class_name=class_name,
    enter_threshold=6,
    exit_threshold=4)

# Initialize renderer.
pose_classification_visualizer = PoseClassificationVisualizer(
    class_name=class_name,
    plot_x_max=20,
    # Graphic looks nicer if it's the same as `top_n_by_mean_distance`.
    plot_y_max=10)


def main():

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

                    cv2.putText(display_frame, f"Pose: {pose_classification}", (10, 50),
                                cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 0, 255), 2)
                    cv2.putText(display_frame, f"Reps: {repetitions_count}", (10, 80),
                                cv2.FONT_HERSHEY_PLAIN, 1.5, (255, 0, 0), 2)

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

                    # Draw classification plot and repetition counter.
                    output_frame = pose_classification_visualizer(
                        frame=output_frame,
                        pose_classification=pose_classification,
                        pose_classification_filtered=pose_classification_filtered,
                        repetitions_count=repetitions_count)

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
        'Capture Images at specified intervals to create a pose database')

    args = parser.parse_args()

    main()