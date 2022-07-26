import os
from os import path
import argparse
import cv2
from time import time
from tqdm import tqdm
import mediapipe as mp

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

root_dir = 'fitness_data/videos/'


class FPSCounter():

    def __init__(self):
        self.t1 = time()
        self.num_frames = 0
        self.fps = 0

    def __call__(self):
        self.num_frames += 1
        self.fps = self.num_frames / (time() - self.t1)

        return self.fps


def display(frame, fps_counter, to_rgb=True):

    # Compute FPS
    fps = fps_counter()

    if to_rgb:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    display_frame = cv2.flip(frame, 1)

    cv2.putText(display_frame, f"FPS: {fps}", (10, 20),
                cv2.FONT_HERSHEY_PLAIN, 1.3, (0, 0, 255))

    cv2.imshow('Pose Recorder', display_frame)


def main(exercise, exercise_state):

    # Create output folder for images
    output = path.join(root_dir, exercise, exercise_state)
    if not os.path.exists(output):
        os.makedirs(output, exist_ok=True)

    cam = cv2.VideoCapture(0)
    fps_counter = FPSCounter()

    n_img = 1

    start = None

    with mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
            model_complexity=1) as pose:

        while(True):

            # Capture the video frame
            # by frame
            ret, frame = cam.read()

            if ret:

                image = frame.copy()

                # Draw the pose annotation on the image.
                frame.flags.writeable = True
                frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
                results = pose.process(frame)
                mp_drawing.draw_landmarks(
                    frame,
                    results.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS,
                    landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())

                if start:
                    if (time() - start < 5):
                        print(
                            f"Recording in {time() - start:.2f} seconds...\r", end='')

                    elif (time() - start > 5):

                        # save the frames
                        img_path = os.path.join(
                            output, f'image_{n_img}.jpg')
                        cv2.imwrite(img_path, image)
                        n_img += 1

                if cv2.waitKey(1) & 0xFF == ord('s'):
                    start = time()

                # Display frame
                display(frame, fps_counter)

        cam.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        'Capture Images at specified intervals to create a pose database')

    parser.add_argument('--exercise', '-e', type=str, required=True,
                        help='Name of the exercise')
    parser.add_argument('--exercise-state', '-s', type=str, required=True,
                        help='Name of the state of the exercise like squats_down')

    args = parser.parse_args()

    main(args.exercise, args.exercise_state)
