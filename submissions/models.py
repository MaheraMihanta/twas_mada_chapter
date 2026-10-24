from django.db import models


class ResearchSubmission(models.Model):
    full_name = models.CharField('nom complet', max_length=160)
    email = models.EmailField('adresse e-mail', max_length=254)
    institution = models.CharField('université ou organisme', max_length=200)
    research_title = models.CharField('titre de la recherche', max_length=240)
    research_field = models.CharField('domaine scientifique', max_length=100)
    research_summary = models.TextField('résumé des travaux', max_length=5000)
    keywords = models.CharField('mots-clés', max_length=300, blank=True)
    consent = models.BooleanField('consentement donné', default=False)
    created_at = models.DateTimeField('reçu le', auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'présentation de recherche'
        verbose_name_plural = 'présentations de recherche'

    def __str__(self):
        return f'{self.research_title} — {self.full_name}'
