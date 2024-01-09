describe('First test suit', () => {
  test('should return true', () => {
    // Initialization
    const message = 'Hello world';

    // Estimulo
    const message2 = message.trim();

    // Observar el comportamiento... esperado/expect
    expect(message).toBe(message2);
  });
});
