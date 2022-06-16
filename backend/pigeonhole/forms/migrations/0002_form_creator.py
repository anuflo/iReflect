# Generated by Django 4.0.2 on 2022-03-17 03:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_account_type'),
        ('forms', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
    ]