var persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

declare global {
  interface String {
    forceRTL(): string;
    forceLTR(): string;
    toPersianDigits(): string;
    toEnglishDigits(): string;
  }

  interface Array<T> {
    remove(o: T): Array<T>;
    equals(array: T[], strict: boolean): boolean;
  }
}

String.prototype.forceRTL = function () {
  let d = String(this);
  return "\u200F" + d;
};

String.prototype.forceLTR = function () {
  let d = String(this);
  return "\u200E" + d;
};

String.prototype.toPersianDigits = function () {
  //@ts-ignore
  return this.replace(/\d/g, (i) => "۰۱۲۳۴۵۶۷۸۹"[i]);
};

String.prototype.toEnglishDigits = function () {
  var str = this.toString();
  for (var i = 0; i < 10; i++) {
    str = str
      .replace(persianNumbers[i], i.toString())
      .replace(arabicNumbers[i], i.toString());
  }

  return str;
};

if (!Array.prototype.remove) {
  Array.prototype.remove = function <T>(elem: T): T[] {
    return this.filter((e) => e !== elem);
  };
}
if (!Array.prototype.equals) {
  Array.prototype.equals = function <T>(array: T[], strict: boolean): boolean {
    if (!array) return false;

    if (arguments.length == 1) strict = true;

    if (this.length != array.length) return false;

    for (var i = 0; i < this.length; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i], strict)) return false;
      } else if (strict && this[i] != array[i]) {
        return false;
      } else if (!strict) {
        return this.sort().equals(array.sort(), true);
      }
    }
    return true;
  };
}

export {};
