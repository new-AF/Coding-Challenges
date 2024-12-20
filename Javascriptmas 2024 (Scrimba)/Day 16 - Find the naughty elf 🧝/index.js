import { workshopData } from "/data.js";

/*
Santa has grown suspicious that one of his elves isn't playing fair. The elves are paid well to make toys but Santa thinks one of the elves is keeping some of the toys he has made (and probably selling them on the black market in one of Laplands dodgier neighbourhoods.)

Santa has written a script to recursively look over the data and find discrepancies. But Santa is not so great at coding and he has got bugs he can't resolve.

This code should:
 - Traverse through all elves.
 - Traverse toysShipped, summing up toy counts across regions and subregions.
 - Compare the aggregated counts with toysMade to determine discrepancies.
But it doesn't!

Your task: debug this code - there are two bugs to find! 

Stretch Goal

- Recursion is hard! Delete everything in index.js and start again from scratch. You don't have to do it the same way. Perhaps you can find a better way.
 
*/

// Function to find the elf who created more presents than they delivered
function findNaughtyElf(data) {
    const naughtyElves = [];

    /* track = {
    e.g. elfName: ""
    toys:{
     "Teddy Bear": {madeCount: 0, shippedCount: 0} 
    }
  } */
    const track = {};
    const recurse = (currentKey, value, parentKey) => {
        /* Objects and Arrays */
        if (typeof value === "object") {
            console.log();
            const newParentKey =
                currentKey === "toysMade" || currentKey === "toysShipped"
                    ? currentKey
                    : parentKey;
            console.log({ currentKey, parentKey }, Object.keys(value));
            Object.keys(value).forEach((key) =>
                recurse(key, value[key], newParentKey)
            );
        } else if (currentKey === "name") {
        /* toys : {
     "Teddy Bear": {madeCount: 0, shippedCount: 0} 
    } */
            track["name"] = value;
            track["toys"] = {};
        } else if (parentKey === "toysMade") track.toys[currentKey] = value;
    };

    const isArray = (element) => Array.isArray(element);
    const isNotArray = (element) => Array.isArray(element) === false;

    // data.forEach(element => recurse(null, element))

    recurse(null, data[0]);

    console.log(track);

    return naughtyElves.join(", ");
}

// Example usage
console.log(findNaughtyElf(workshopData)); //Elf Kalvin Armadillo
