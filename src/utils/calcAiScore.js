export function calcAiScore(data) {
  if (Array.isArray(data)) {
    let max = {
      score: 0,
      label: undefined,
      color: "secondary",
    };
    data.forEach((image) =>
      image.forEach((classes) => {
        let bias = 0;
        let color = "secondary";
        if (classes.label.includes("smooth")) {
          bias = 1;
          color = "secondary";
        }
        if (classes.label.includes("gravel")) {
          bias = 6;
          color = "warning";
        }
        if (classes.label.includes("severe")) {
          bias = 9;
          color = "error";
        }
        const score = classes.score * bias * 100;
        if (score > max.score) {
          max = {
            score: Math.floor(score),
            label: classes.label,
            color,
          };
        }
      })
    );
    return max;
  }
  return undefined;
}
