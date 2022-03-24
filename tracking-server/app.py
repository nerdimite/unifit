import json
from flask import Flask, request
from flask_cors import CORS

import numpy as np
from pose_classification import (
    FullBodyPoseEmbedder,
    PoseClassifier,
    EMADictSmoothing,
    RepetitionCounter
)
from pose_critic import PoseCritic

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# exercise = 'pushups'

# Initialize embedder.
pose_embedder = FullBodyPoseEmbedder()

# Initialize EMA smoothing.
pose_classification_filter = EMADictSmoothing(
    window_size=10,
    alpha=0.2)

# Initialize PoseCritic
pose_critic = PoseCritic()


@app.route('/pred', methods=['POST'])
def prediction():

    # POST request
    if request.method == 'POST':
        payload = request.get_json()
        # print(payload)

        landmarks = payload['landmarks']
        exercise = payload['exercise']

        pose_classifier = PoseClassifier(
            pose_samples_folder=f'fitness_data/{exercise}/',
            pose_embedder=pose_embedder,
            top_n_by_max_distance=30,
            top_n_by_mean_distance=10,
            axes_weights=(1., 1., 0.2)
        )
        # repetition_counter = RepetitionCounter(
        #     class_name='squats_down',
        #     enter_threshold=6,
        #     exit_threshold=4
        # )

        # Format the landmarks
        frame_height, frame_width = 500, 889
        pose_landmarks = np.array([[lmk['x'] * frame_width, lmk['y'] * frame_height, lmk['z'] * frame_width]
                                   for lmk in landmarks], dtype=np.float32)

        visibility = all([lmk['visibility'] > 0.5 for lmk in landmarks])

        # Classify the pose on the current frame
        pose_classification = pose_classifier(pose_landmarks)

        # Smooth classification using EMA
        # pose_classification_filtered = pose_classification_filter(
        #     pose_classification)
        # pose_state = sorted(
        #     pose_classification_filtered.items(), key=lambda x: x[1])[-1][0]

        # Count repetitions
        # reps = repetition_counter(pose_classification_filtered)

        # Check Accuracy of Pose
        # is_correct, remarks = pose_critic(
        #     exercise, pose_state, pose_landmarks)

        output = {
            # 'pose_state': pose_state,
            'pose_classification': pose_classification,
            'visibility': visibility,
            # 'remarks': remarks
        }

        return json.dumps(output), 200


@app.route('/critic', methods=['POST'])
def critic():

    # POST request
    if request.method == 'POST':
        payload = request.get_json()
        # print(payload)

        landmarks = payload['landmarks']
        pose_state = payload['pose_state']
        exercise = payload['exercise']

        # Format the landmarks
        frame_height, frame_width = 500, 889
        pose_landmarks = np.array([[lmk['x'] * frame_width, lmk['y'] * frame_height, lmk['z'] * frame_width]
                                   for lmk in landmarks], dtype=np.float32)

        # Check Accuracy of Pose
        is_correct, remarks = pose_critic(
            exercise, pose_state, pose_landmarks)

        output = {
            'remarks': remarks,
            'isCorrect': is_correct
        }

        return json.dumps(output), 200


if __name__ == '__main__':
    app.run(port=5000)
