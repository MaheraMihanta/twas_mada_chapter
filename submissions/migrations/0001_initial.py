from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ResearchSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=160, verbose_name='nom complet')),
                ('email', models.EmailField(max_length=254, verbose_name='adresse e-mail')),
                ('institution', models.CharField(max_length=200, verbose_name='université ou organisme')),
                ('research_title', models.CharField(max_length=240, verbose_name='titre de la recherche')),
                ('research_field', models.CharField(max_length=100, verbose_name='domaine scientifique')),
                ('research_summary', models.TextField(max_length=5000, verbose_name='résumé des travaux')),
                ('keywords', models.CharField(blank=True, max_length=300, verbose_name='mots-clés')),
                ('consent', models.BooleanField(default=False, verbose_name='consentement donné')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='reçu le')),
            ],
            options={
                'verbose_name': 'présentation de recherche',
                'verbose_name_plural': 'présentations de recherche',
                'ordering': ['-created_at'],
            },
        ),
    ]
