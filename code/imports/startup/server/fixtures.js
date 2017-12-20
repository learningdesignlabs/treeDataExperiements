import { Features } from '/imports/api/Features/features.js';

/*
const treeData = [
  { title: 'Dog', children: [{ title: 'Puppy' }] },
  { title: 'Cat', children: [{ title: 'Kitten' }] },
  { title: 'Chicken', children: [{ title: 'Egg' }] },
  { title: 'Human', children: [{ title: 'Baby' }] },
];
*/

const treeData = [
  { id: 'doggie', title: 'Dog', parent: null },
  { id: 'puppie', title: 'puppy', parent: 'doggie' },
  { id: 'cattie', title: 'Cat', parent: null },
  { id: 'chickie', title: 'Chicken', parent: null },
  { id: 'duders', title: 'Human', parent: null },
];

treeData.forEach((doc) => {
  const docExists = Features.findOne({ title: doc.title });
  if (!docExists) {
    Features.insert(doc);
  }
});


