"use client";

import { createSite } from "@openanalytics/api";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Input } from "./input";

interface Props {
  userId: string;
}

export const AddSite = ({ userId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refresh } = useRouter();
  const [nameErrors, setNameErrors] = useState([]);
  const [urlErrors, setUrlErrors] = useState([]);
  const handleOnSubmit = async (formData: FormData) => {
    const data = await createSite(formData, userId);
    if (data.success) {
      setIsOpen(false);
      refresh();
      return;
    }

    if (data.inputs?.name) {
      setNameErrors(data.inputs?.name);
    }
    if (data.inputs?.url) {
      setUrlErrors(data.inputs?.url);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button highContrast>
          New
          <PlusIcon style={{ marginLeft: 2 }} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>New site</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add the information of your site
        </Dialog.Description>
        <form action={handleOnSubmit}>
          <Flex direction="column" gap="3">
            <Input
              errors={nameErrors}
              label="Name"
              name="name"
              placeholder="My site name"
            />
            <Input
              errors={urlErrors}
              label="Url"
              name="url"
              placeholder="mysite.com"
            />
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <SaveButton />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button highContrast disabled={pending} type="submit">
      {pending ? "..." : "Save"}
    </Button>
  );
}
