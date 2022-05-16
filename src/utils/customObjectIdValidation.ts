import { CustomHelpers, LanguageMessages } from 'joi';

export const customObjectIdValidation = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message(<LanguageMessages>{
      messages: '"{{#label}}" must be a valid mongo id',
    });
  }
  return value;
};
