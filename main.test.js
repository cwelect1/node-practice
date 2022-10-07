import fetchColors from './index';

test('for hex EFDECD returns Almond', async () => {
  const res = await fetchColors({
    hex: 'EFDECD',
  });

  expect(res.length).toEqual(1);
  expect(res[0].name).toEqual('Almond');
});

test('for compHex FFFFFF the expected 14 colors', async () => {
  const res = await fetchColors({
    compHex: 'FFFFFF',
  });

  const expected = [
    'EFDECD',
    'FDD9B5',
    'FAE7B5',
    'FFAACC',
    'FFBCD9',
    'FCB4D5',
    'FDBCB4',
    'FFCFAB',
    'C5D0E6',
    'FDDDE6',
    'ECEABE',
    'EBC7DF',
    'DBD7D2',
    'FFFFFF',
  ].sort();

  const received = res.map((r) => r.hex).sort();

  expected.forEach((e, i) => {
    expect(received[i]).toBe(e);
  });
});
