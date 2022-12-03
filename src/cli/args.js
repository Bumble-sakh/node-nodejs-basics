const parseArgs = () => {
  const args = process.argv.splice(2);

  for (let i = 0; i < args.length; i++) {
    const argument = args[i];
    const value = args[i++];
    console.log(`${argument} is ${value}`);
  }
};

parseArgs();
