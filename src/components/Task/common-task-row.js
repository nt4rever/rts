const { Divider, Grid, Typography } = require("@mui/material");

const CommonTaskRow = (props) => {
  const { title, content, hasChild, children } = props;

  return (
    <>
      <Divider />
      <Grid container sx={{ px: 3, py: 2, gap: 1 }}>
        <Grid xs={12} md={2} item>
          <Typography variant="subtitle2">{title}</Typography>
        </Grid>
        <Grid xs={12} md={9} item>
          {hasChild && children}
          {!hasChild && <Typography variant="body2">{content}</Typography>}
        </Grid>
      </Grid>
    </>
  );
};

export default CommonTaskRow;
