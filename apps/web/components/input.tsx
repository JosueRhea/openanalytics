import { Text, TextField } from "@radix-ui/themes";
import { type TextFieldInputProps } from "@radix-ui/themes/dist/cjs/components/text-field";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Props extends TextFieldInputProps {
  label: string;
  errors?: string[];
}

export function Input({ label, errors = [], ...rest }: Props) {
  const { pending } = useFormStatus();
  return (
    <label>
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>
      <TextField.Input disabled={pending} {...rest} />
      {errors.length > 0 && (
        <>
          {errors.map((error) => (
            <Text key={error} as="p" size="1" mt="1" color="red">
              {error}
            </Text>
          ))}
        </>
      )}
    </label>
  );
}
