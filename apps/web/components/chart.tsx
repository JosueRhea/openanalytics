"use client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: any[];
  dataKey: string;
  labelKey: string;
}

const CTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // const IconComp = iconsKV[data.activity.icon];
    // const value = Math.round(data.counter * 100) / 100;
    // const name = data.activity.name;
    const formatedDate = new Date(data.date).toLocaleDateString("en-US");
    return (
      <Card style={{ backgroundColor: "var(--color-background)" }}>
        <Flex
          direction="column"
          gap="0"
          // style={{ backgroundColor: "white",  borderWidth: 20, borderColor: "" }}
          align="center"
          justify={"center"}
          width={"max-content"}
          px={"4"}
          py="2"
        >
          <Text className="text-sm text-muted-foreground">{formatedDate}</Text>
          <Text className="text-base">
            {payload[0]?.name}: {payload[0]?.value}
          </Text>
        </Flex>
      </Card>
    );
  }

  return null;
};

export function Chart({ data, dataKey, labelKey }: Props) {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ right: 20 }}>
        <XAxis
          dataKey={labelKey}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            return format(value, "eee, MM")
            // const date = new Date(value);
            // console.log({ value });
            // const formatedDate = date.toLocaleDateString("en-US", {
            //   day: "2-digit",
            //   month: "2-digit",
            //   year: "2-digit",
            // });
            // return formatedDate;
          }}
        />
        <YAxis fontSize={12} width={40} tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: "var(--accent-1)" }} content={<CTooltip />} />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell
              cursor="pointer"
              // fill=""
              style={{ fill: "var(--accent-12)" }}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
