import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
// Function to get 5 random objects from the array
getRandomObjects(array: any[], count: number): any[] {
  const shuffledArray = array.slice(); // Clone the array
  let currentIndex = shuffledArray.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  // Return the first 'count' elements as the random selection
  return shuffledArray.slice(0, count);
  }
}
