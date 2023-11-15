import Vote from "@/components/Vote";
import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { MoreHorizontal } from "react-feather";

const ForumReportItem = (props) => {
  return (
    <Card
      component={NextLink}
      href="/"
      style={{
        textDecoration: "none",
      }}
    >
      <Stack p={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar />
            <Typography variant="subtitle2">Truc Anh</Typography>
            <Typography variant="subtitle2">an hour ago</Typography>
          </Stack>
          <Button size="small">
            <MoreHorizontal size={14} />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Stack spacing={1}>
            <Typography variant="h6">
              Recently adopted a kitten, was worried he wouldn’t get along with
              my dog.
            </Typography>
            <Stack direction="row">
              <Vote />
            </Stack>
          </Stack>
          <Box>
            <Image
              src="https://minio.hmmmm.tech/hmmmm/tickets/655220edc1de576fdbbf63e8/b923ff0a-6e09-4b1e-9495-0732d73a7395.jpg"
              width={90}
              height={60}
              alt="sample"
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ForumReportItem;
