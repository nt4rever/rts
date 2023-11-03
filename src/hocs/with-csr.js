import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const withCSR = (next) => async (ctx) => {
  // Check is it a client side navigation
  const isCSR = ctx.req.url?.startsWith("/_next");

  if (isCSR)
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale || "vi")),
      },
    };

  return next?.(ctx);
};
