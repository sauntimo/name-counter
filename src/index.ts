#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
const StreamSearch = require('streamsearch');

interface INameCount {
  name: string;
  count: number;
}

/**
 * Helper function to sort array of objects by a property value
 * @param a an array item
 * @param b another array item
 */
const compareCounts = (a: INameCount, b: INameCount) => {
  return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0)
}

/**
 * load names from a file and get counts for each. Returns non-zero results.
 */
const processNames = async (): Promise<INameCount[]> => {

  const data = fs.readFileSync(path.join(__dirname, '../inputs/first-names.txt'), 'utf8');
  const names: string[] = data.split("\r")
  const uniqueNames: string[] = Array.from(new Set(names));

  console.log(
    `Loaded ${uniqueNames.length} unique names begining with ` +
    `${uniqueNames[0]} and ending with ${uniqueNames[uniqueNames.length - 1]}`
  );
  console.log('Calculating occurrences of each name in text...');

  const nameCountsRaw = await Promise.all(uniqueNames.map(async name => countName(name)));
  const nameCounts = nameCountsRaw
    .reduce<INameCount[]>((acc, cur, idx) => {
      acc.push({
        name: uniqueNames[idx],
        count: cur
      });
      return acc;
    }, [])
    .filter(el => el.count > 0);

  return nameCounts.sort(compareCounts);
}

/**
 * Takes a name and returns a count of occurrences in Olive Twist
 * @param name a name to search the text for
 */
const countName = async (name: string): Promise<number> => {

  let needle = Buffer.from(name, 'utf8')
  let streamSearch = new StreamSearch(needle);
  const readStream = fs.createReadStream(path.join(__dirname, '../inputs/oliver-twist.txt'), 'utf8');

  return new Promise((resolve, reject) => {
    readStream.on('data', (chunk) => {
      streamSearch.push(chunk);
    }).on('end', () => {
      resolve(streamSearch.matches);
    });
  });
}

/**
 * Creates or overwrites a results file
 * @param nameCounts array of objects of names and counts
 */
const writeResults = async (nameCounts: INameCount[]) => {

  const stream = fs.createWriteStream("results.txt");
  stream.once('open', () => {
    nameCounts.map(el => {
      stream.write(`${el.name}: ${el.count}\n`);
    })
    stream.end();
  });

  console.log(`Wrote ${nameCounts.length} lines to results.txt`);
}

/**
 * runs code, outputs results, times execution
 */
const main = async () => {
  const hrstart = process.hrtime()
  const nameCounts = await processNames();
  writeResults(nameCounts);
  const hrend = process.hrtime(hrstart);
  console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
}

main();
