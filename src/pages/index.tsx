import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import RhfTextField from '~/components/Front/Fieldset/RhfTextField';
import { groupBy } from 'lodash';
import RhfTextRangeField from '~/components/Front/Fieldset/RhfTextRangeField';

export const fieldsetSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), payload: z.string() }),
  z.object({ type: z.literal('number'), payload: z.number().nullable() }),
  z.object({ type: z.literal('select'), payload: z.string() }),
  z.object({ type: z.literal('radio'), payload: z.string() }),
  z.object({ type: z.literal('checkbox'), payload: z.array(z.string()) }),
]);

const formSchema = z.record(fieldsetSchema);
type InputSchema = z.input<typeof formSchema>;
export type FormSchema<
  T extends InputSchema[string]['type'] = InputSchema[string]['type'],
  U extends InputSchema[string] = InputSchema[string]
> = Record<string, Extract<U, { type: T }>>;

type FormItem = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textRange';
  index: number;
  options?: { id: string; value: string; label: string }[];
};

// const getInitialValue = (
//   type: FieldsetFactoryProps['type']
// ): FormSchema[string] => {
//   // ...省略
// };

const formItems: FormItem[] = [
  {
    id: '1',
    name: 'item-1',
    label: '項目',
    placeholder: 'ダミーテキスト',
    type: 'textRange',
    index: 1,
  },
  {
    id: '2',
    name: 'item-2',
    label: '項目',
    placeholder: 'ダミーテキスト',
    type: 'textRange',
    index: 2,
  },
  {
    id: '3',
    name: 'item-3',
    label: '項目3',
    placeholder: 'ダミーテキスト',
    type: 'text',
    index: 3,
  },
];

const Home = () => {
  const methods = useForm<FormSchema>();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return (
    <FormProvider {...methods}>
      <Stack spacing={2}>
        {Object.entries(groupBy(formItems, 'label')).map((el, key) => {
          const items = el[1];
          const { type, options, ...rest } = items[0];
          switch (items[0].type) {
            case 'text':
              return <RhfTextField key={key} {...rest} />;
            case 'textRange':
              const { name: startName } = items[0];
              const { name: endName } = items[1];
              return (
                <RhfTextRangeField
                  key={key}
                  start={{ name: startName }}
                  end={{ name: endName }}
                  {...rest}
                />
              );
            default:
              return <></>;
          }
        })}
      </Stack>
    </FormProvider>
  );
};

export default Home;
