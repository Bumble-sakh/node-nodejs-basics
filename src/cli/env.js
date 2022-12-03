const parseEnv = () => {
  const allEnv = process.env;
  const rssEnv = Object.keys(allEnv).filter((key) => key.startsWith('RSS_'));
  rssEnv.forEach((key) => console.log(`${key}=${allEnv[key]}`));
};

parseEnv();
