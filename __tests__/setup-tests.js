const originalConsoleError = console.error;

console.error = (...args) => {
  if (
    !args[0].startsWith(
      // eslint-disable-next-line unicorn/string-content
      'Warning: An update to %s inside a test was not wrapped in act(...)'
    ) &&
    !args[0].startsWith(
      'Warning: AsyncStorage has been extracted from react-native'
    )
  ) {
    originalConsoleError(...args);
  }
};
