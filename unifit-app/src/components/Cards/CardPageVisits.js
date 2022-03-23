import React from 'react';

// components

export default function CardPageVisits() {
  return (
    <div>
      <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/images/upper-body.jpg" alt="Mountain"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Upper Body</div>
        <p
          class="text-gray-700 text-base"
        >
            Range of exercises to effectively train your Chests, Biceps, Triceps, Shoulders and Back.
        </p>
        <div className='py-2'>
        <a
          href ='/app/workout'
          target = 'blank'
          className='text-blue-700 text-base'
        >
          Start Workout
        </a>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Pushups</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Pike Pushups</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Half Crunches</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Leg Raises</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">+ more</span>
      </div>
    </div>
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/images/legs.jpg" alt="River"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Lower Body</div>
        <p class="text-gray-700 text-base">
        Range of exercises to effectively train your Legs and Gluteus Maximus.
        </p>
        <div className='py-2'>
        <a
          href ='/app/workout'
          target = 'blank'
          className='text-blue-700 text-base'
        >
          Start Workout
        </a>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Squats</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lunges</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Calf Raise</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Pistol Squats</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">+ more</span>
      </div>
    </div>

    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/images/fat.png" alt="Forest"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Fat Burner (HIIT)</div>
        <p class="text-gray-700 text-base">
        Workouts that involve short periods of intense exercise alternated with recovery periods
        </p>
        <div className='py-2'>
        <a
          href ='/app/workout'
          target = 'blank'
          className='text-blue-700 text-base'
        >
          Start Workout
        </a>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Decline Press Up Jacks</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Mountian Climbers</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Leg Raises</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">+ more</span>
      </div>
    </div>
  </div>
</div>
  );
}
