import { Card, Grid, Heading, Text } from "@radix-ui/themes";

interface Props {
  totalHits: number;
  singleVisitors: number;
}

export function Stats({ totalHits, singleVisitors }: Props) {
  return (
    <Grid columns={{ initial: "1", xs: "2", sm: "3" }} gap="4">
      <Stat name="Page views" value={totalHits} />
      <Stat name="Visitors" value={singleVisitors} />
    </Grid>
  );
}

interface StatProps {
  value: number;
  name: string;
}

function Stat({ name, value }: StatProps) {
  return (
    <Card>
      <Text size="3">{name}</Text>
      <Heading mt="2">
        {Intl.NumberFormat("en-US", {
          compactDisplay: "short",
          notation: "compact",
        }).format(value)}
      </Heading>
    </Card>
  );
}
