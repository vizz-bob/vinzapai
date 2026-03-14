from django.db import models


class Metric(models.Model):
    name = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=15, decimal_places=2)
    change_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    icon = models.CharField(max_length=50, default='fas fa-chart-line')
    color = models.CharField(max_length=20, default='blue')
    prefix = models.CharField(max_length=10, blank=True)
    suffix = models.CharField(max_length=10, blank=True)
    order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Metrics'

    def __str__(self):
        return self.name


class ActivityLog(models.Model):
    TYPES = [
        ('user', 'User'),
        ('project', 'Project'),
        ('system', 'System'),
        ('ai', 'AI'),
    ]
    activity_type = models.CharField(max_length=20, choices=TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    user_name = models.CharField(max_length=100, default='System')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = 'Activity Logs'

    def __str__(self):
        return self.title


class AIInsight(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    insight_type = models.CharField(max_length=50, default='recommendation')
    priority = models.CharField(
        max_length=20,
        choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')],
        default='medium'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'AI Insights'

    def __str__(self):
        return self.title
