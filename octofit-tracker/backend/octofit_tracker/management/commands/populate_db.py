from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Borrar datos existentes
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Equipos
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Usuarios
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel.name)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel.name)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc.name)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc.name)

        # Actividades
        Activity.objects.create(user=tony.name, type='run', duration=30, date='2024-04-01')
        Activity.objects.create(user=steve.name, type='cycle', duration=45, date='2024-04-02')
        Activity.objects.create(user=bruce.name, type='swim', duration=25, date='2024-04-03')
        Activity.objects.create(user=clark.name, type='run', duration=60, date='2024-04-04')

        # Leaderboard
        Leaderboard.objects.create(user=tony.name, points=100, rank=1)
        Leaderboard.objects.create(user=steve.name, points=90, rank=2)
        Leaderboard.objects.create(user=bruce.name, points=80, rank=3)
        Leaderboard.objects.create(user=clark.name, points=70, rank=4)

        # Workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Situps', description='Do 30 situps', difficulty='easy')
        Workout.objects.create(name='Squats', description='Do 40 squats', difficulty='medium')
        Workout.objects.create(name='Burpees', description='Do 15 burpees', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
