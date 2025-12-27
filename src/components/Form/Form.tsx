import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import { Button } from '@/components/Button/Button';
import type { PatientFormData, PatientFormProps } from '@/models/form.interface';

export const PatientForm = ({ defaultValues, onSubmit, onCancel }: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PatientFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      website: '',
      avatar: '',
      description: '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        website: defaultValues.website,
        avatar: defaultValues.avatar,
        description: defaultValues.description,
      });
    } else {
      reset({
        name: '',
        website: '',
        avatar: '',
        description: '',
      });
    }
  }, [defaultValues, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Ej: Juan Perez"
          className={errors.name ? styles.inputError : ''}
          {...register('name', {
            required: "El nombre es obligatorio",
            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
          })}
        />
        {errors.name && <span className={styles.errorMsg}>⚠ {errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="website">Sitio Web</label>
        <input
          id="website"
          type="url"
          placeholder="https://ejemplo.com"
          className={errors.website ? styles.inputError : ''}
          {...register('website', {
            pattern: {
              value: /^https?:\/\/.+\..+/,
              message: 'Debe ser una URL válida (ej: https://site.com)'
            }
          })}
        />
        {errors.website && <span className={styles.errorMsg}>⚠ {errors.website.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="avatar">URL del Avatar</label>
        <input
          id="avatar"
          type="url"
          placeholder="https://..."
          className={errors.avatar ? styles.inputError : ''}
          {...register('avatar', {
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Debe ser una URL válida de imagen'
            }
          })}
        />
        {errors.avatar && <span className={styles.errorMsg}>⚠ {errors.avatar.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          rows={3}
          placeholder="Información adicional del paciente..."
          className={errors.description ? styles.inputError : ''}
          {...register('description', {
            minLength: { value: 1, message: 'La descripción debe tener al menos 1 caracteres' }
          })}
        />
        {errors.description && <span className={styles.errorMsg}>⚠ {errors.description.message}</span>}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>

        <Button type="submit" disabled={!isValid}>
          {defaultValues ? 'Guardar Cambios' : 'Crear Paciente'}
        </Button>
      </div>
    </form>
  );
};