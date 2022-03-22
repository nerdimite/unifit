import os
import argparse
import cv2
from time import time
import mediapipe as mp

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose


def main(skip_frames, output, num_images):
    # Create output folder for images
    if not os.path.exists(output):
        os.makedirs(output, exist_ok=True)

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

                # Display FPS
                fps = num_frames / (time() - t1)

                display_frame = cv2.flip(
                    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), 1)
                cv2.putText(display_frame, f"FPS: {fps}", (10, 20),
                            cv2.FONT_HERSHEY_PLAIN, 1.3, (0, 0, 255))

                # Display the resulting frame
                cv2.imshow('Pose Recorder', display_frame)

                # save the frames
                if num_frames % skip_frames == 0:
                    img_path = os.path.join(output, f'image_{n}.jpg')
                    cv2.imwrite(img_path, image)
                    n += 1

                    if n > num_images:
                        print(f'Saved the Images to {output}')
                        break

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

                num_frames += 1

        cam.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        'Capture Images at specified intervals to create a pose database')

    parser.add_argument('--skip-frames', '-s', type=int,
                        default='20', help='Number of frames to skip before saving a frame.')
    parser.add_argument('--output', '-o', type=str, required=True,
                        help='Path to output folder to save the images.')
    parser.add_argument('--images', '-i', type=int, default=0,
                        help='Number of images to capture. Set 0 to disable.')

    args = parser.parse_args()

    main(args.skip_frames, args.output, args.images)
