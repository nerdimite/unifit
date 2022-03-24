import math
import numpy as np

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_percentage_error


class PoseCritic():
    '''Checks the correctness of a particular exercise'''

    def __init__(self):
        self.landmark_names = [
            'nose',
            'left_eye_inner', 'left_eye', 'left_eye_outer',
            'right_eye_inner', 'right_eye', 'right_eye_outer',
            'left_ear', 'right_ear',
            'mouth_left', 'mouth_right',
            'left_shoulder', 'right_shoulder',
            'left_elbow', 'right_elbow',
            'left_wrist', 'right_wrist',
            'left_pinky_1', 'right_pinky_1',
            'left_index_1', 'right_index_1',
            'left_thumb_2', 'right_thumb_2',
            'left_hip', 'right_hip',
            'left_knee', 'right_knee',
            'left_ankle', 'right_ankle',
            'left_heel', 'right_heel',
            'left_foot_index', 'right_foot_index',
        ]

        self.pose_critic = {
            'squats': self.check_squats,
            'pushups': self.check_pushups,
        }

    def __call__(self, exercise: str, pose_state: str, landmarks: np.array):
        return self.pose_critic[exercise](pose_state, landmarks)

    def check_squats(self, pose_state, landmarks):
        '''Criteria for Squats
        -> Data-driven so no criteria
        '''
        # if pose_state == 'squats_down':
        #     knee_angle = np.mean([
        #         self._compute_joint_angle(
        #             landmarks, ['left_hip', 'left_knee', 'left_ankle']),
        #         self._compute_joint_angle(
        #             landmarks, ['right_hip', 'right_knee', 'right_ankle'])
        #     ]).round()
        #     print(knee_angle)

        #     if knee_angle <= 40:
        #         return True, 'Good Job'
        #     elif knee_angle > 40:
        #         return False, 'Bend your knees further'
        # else:
        #     return True, "Keep Going"

        return True, 'Good Job'

    def check_pushups(self, pose_state, landmarks):
        '''Criteria for Pushups
        -> Shoulders, Hips and Ankles should be in straight line
        '''
        torso_joints = ['left_shoulder',
                        'right_shoulder',
                        'left_hip',
                        'right_hip',
                        'left_knee',
                        'right_knee',
                        'left_ankle',
                        'right_ankle']

        points = np.array([landmarks[self.landmark_names.index(j)]
                          for j in torso_joints])

        line_model = LinearRegression()
        line_model.fit(points[:, :1], points[:, 1])  # use X and Y only for now

        error = mean_absolute_percentage_error(
            points[:, 1], line_model.predict(points[:, :1]))

        if error < 0.05:
            return True, 'Good Job'
        else:
            return False, 'Keep your back and body straight'

    def _calculate_angle(self, p1, p2, p3):

        x1, y1, z1 = p1
        x2, y2, z2 = p2
        x3, y3, z3 = p3

        # Find direction ratio of line AB
        ABx = x1 - x2
        ABy = y1 - y2
        ABz = z1 - z2

        # Find direction ratio of line BC
        BCx = x3 - x2
        BCy = y3 - y2
        BCz = z3 - z2

        # Find the dotProduct
        # of lines AB & BC
        dotProduct = (ABx * BCx +
                      ABy * BCy +
                      ABz * BCz)

        # Find magnitude of
        # line AB and BC
        magnitudeAB = (ABx * ABx +
                       ABy * ABy +
                       ABz * ABz)
        magnitudeBC = (BCx * BCx +
                       BCy * BCy +
                       BCz * BCz)

        # Find the cosine of
        # the angle formed
        # by line AB and BC
        angle = dotProduct
        angle /= math.sqrt(magnitudeAB *
                           magnitudeBC)

        # Find angle in radian
        angle = (angle * 180) / 3.14

        return round(abs(angle), 4)

    def _compute_joint_angle(self, landmarks, joints):
        assert len(joints) == 3, 'Angle can only be calculated between 3 points'

        points = []
        for j in joints:
            p = landmarks[self.landmark_names.index(j)]
            points.append(p)

        p1, p2, p3 = points

        angle = self._calculate_angle(p1, p2, p3)

        return angle
