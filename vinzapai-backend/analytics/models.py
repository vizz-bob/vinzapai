from django.db import models


class RevenueData(models.Model):
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    revenue = models.DecimalField(max_digits=12, decimal_places=2)
    expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    profit = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        ordering = ['year', 'month']
        verbose_name_plural = 'Revenue Data'

    def __str__(self):
        return f'{self.month} {self.year}'


class UserGrowth(models.Model):
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    new_users = models.IntegerField(default=0)
    active_users = models.IntegerField(default=0)
    churned_users = models.IntegerField(default=0)

    class Meta:
        ordering = ['year', 'month']
        verbose_name_plural = 'User Growth'

    def __str__(self):
        return f'{self.month} {self.year}'


class TrafficSource(models.Model):
    source = models.CharField(max_length=100)
    visitors = models.IntegerField(default=0)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    color = models.CharField(max_length=20, default='#6366f1')

    class Meta:
        ordering = ['-visitors']
        verbose_name_plural = 'Traffic Sources'

    def __str__(self):
        return self.source
