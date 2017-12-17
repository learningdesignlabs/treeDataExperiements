import { Features } from '/imports/api/Features/features.js';

const treeData = [
  { title: 'Dog', children: [{ title: 'Puppy' }] },
  { title: 'Cat', children: [{ title: 'Kitten' }] },
  { title: 'Chicken', children: [{ title: 'Egg' }] },
  { title: 'Human', children: [{ title: 'Baby' }] },
];

treeData.forEach((doc) => {
  const docExists = Features.findOne({ title: doc.title });
  if (!docExists) {
    Features.insert(doc);
  }
});
