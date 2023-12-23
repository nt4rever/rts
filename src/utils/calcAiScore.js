export function calcAiScore(data) {
  if (Array.isArray(data)) {
    let max = {
      score: 0,
      label: undefined,
      color: "secondary",
    };
    data.forEach((classes) => {
      const top = classes[0];
      let bias = 0;
      let color = "secondary";
      if (top.label.includes("smooth")) {
        bias = 1;
        color = "secondary";
      }
      if (top.label.includes("gravel")) {
        bias = 6;
        color = "warning";
      }
      if (top.label.includes("severe")) {
        bias = 9;
        color = "error";
      }
      const score = top.score * bias * 100;
      if (score > max.score) {
        max = {
          score: Math.floor(score),
          label: top.label,
          color,
        };
      }
    });
    return max;
  }
  return undefined;
}
