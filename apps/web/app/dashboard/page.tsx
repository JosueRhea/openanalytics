import { Button, Flex, Text } from "@radix-ui/themes";

function DashboardPage() {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button variant="soft" color="gray">
        Hello
      </Button>
      <Button size="2" variant="solid" color="gray" highContrast>
        Hello
      </Button>
    </Flex>
  );
}

export default DashboardPage;
