from os import path
import argparse
from pose_classification_utils import BootstrapHelper

root_dir = 'fitness_data'


def main(exercise):

    bootstrap_images_in_folder = path.join(root_dir, 'raw_train', exercise)
    bootstrap_images_out_folder = path.join(
        root_dir, 'processed_train', exercise)
    bootstrap_csvs_out_folder = path.join(
        root_dir, 'processed_train', exercise, 'csvs_out')

    # Initialize helper.
    bootstrap_helper = BootstrapHelper(
        images_in_folder=bootstrap_images_in_folder,
        images_out_folder=bootstrap_images_out_folder,
        csvs_out_folder=bootstrap_csvs_out_folder,
    )

    # Check how many pose classes and images for them are available.
    bootstrap_helper.print_images_in_statistics()

    # Bootstrap all images.
    bootstrap_helper.bootstrap(per_pose_class_limit=None)

    # Check how many images were bootstrapped.
    bootstrap_helper.print_images_out_statistics()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        'Process the raw images recorded and create the exercise database')

    parser.add_argument('--exercise', '-e', type=str,
                        default='squats', help='Name of exercise')

    args = parser.parse_args()

    main(args.exercise)
