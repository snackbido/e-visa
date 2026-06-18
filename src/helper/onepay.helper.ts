import * as CryptoJS from 'crypto-js';

export const sortObj = (
  obj: Record<string, string>,
): Record<string, string> => {
  return Object.keys(obj)
    .sort()
    .reduce(
      function (result: Record<string, string>, key: string) {
        result[key] = obj[key];
        return result;
      },
      {} as Record<string, string>,
    );
};

export const generateStringToHash = (
  paramSorted: Record<string, string>,
): string => {
  let stringToHash = '';
  for (const key in paramSorted) {
    const value = paramSorted[key];
    if (typeof value !== 'string') {
      continue;
    }
    const pref4 = key.substring(0, 4);
    const pref5 = key.substring(0, 5);
    if (pref4 == 'vpc_' || pref5 == 'user_') {
      if (key != 'vpc_SecureHash' && key != 'vpc_SecureHashType') {
        if (value.length > 0) {
          if (stringToHash.length > 0) {
            stringToHash = stringToHash + '&';
          }
          stringToHash = stringToHash + key + '=' + value;
        }
      }
    }
  }
  return stringToHash;
};

export const genSecureHash = (
  stringToHash: string,
  merHashCode: string,
): string => {
  const merHashHex = CryptoJS.enc.Hex.parse(merHashCode);
  const keyHash = CryptoJS.HmacSHA256(stringToHash, merHashHex);
  const keyHashHex = CryptoJS.enc.Hex.stringify(keyHash).toUpperCase();
  return keyHashHex;
};

export const onePayVerifySecureHash = (
  urlResponse: string,
  merHashCode: string,
): boolean => {
  const newURL = new URL(urlResponse);
  const params = new URLSearchParams(newURL.search);
  const hashFromMerchant = params.get('vpc_SecureHash');
  const paramObject = Object.fromEntries(params);
  const paramsSorted = sortObj(paramObject);
  const stringToHash = generateStringToHash(paramsSorted);
  const onePaySign = genSecureHash(stringToHash, merHashCode);
  if (onePaySign == hashFromMerchant) {
    return true;
  } else {
    return false;
  }
};
