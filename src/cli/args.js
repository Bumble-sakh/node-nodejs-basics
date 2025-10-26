const parseArgs = () => {
  const args = process.argv.slice(2);

  const parsedArgs = [];

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i];
    const value = args[i + 1];

    if (propName && value) {
      const cleanPropName = propName.slice(2);

      parsedArgs.push(`${cleanPropName} is ${value}`);
    }
  }

  console.log(parsedArgs.join(", "));
};

parseArgs();
