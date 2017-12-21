import { Features } from '/imports/api/Features/features.js';

/*
const treeData = [
  { title: 'Dog', children: [{ title: 'Puppy' }] },
  { title: 'Cat', children: [{ title: 'Kitten' }] },
  { title: 'Chicken', children: [{ title: 'Egg' }] },
  { title: 'Human', children: [{ title: 'Baby' }] },
];
*/

/*
const treeData = [
  { id: 'doggie', title: 'Dog', parent: null },
  { id: 'puppie', title: 'puppy', parent: 'doggie' },
  { id: 'cattie', title: 'Cat', parent: null },
  { id: 'chickie', title: 'Chicken', parent: null },
  { id: 'duders', title: 'Human', parent: null },
];
*/

const treeData = [
  { title: 'Dog', parent: null },
  { title: 'Shiba Inu', parent: 'null' },
  { title: 'Feline', parent: null },
  { title: 'Tiger', parent: null },
  { title: 'House Cat', parent: null },
  { title: 'Chicken', parent: null },
  { title: 'Human', parent: null },
];

treeData.forEach((doc) => {
  const docExists = Features.findOne({ title: doc.title });
  if (!docExists) {

    if(doc.title == "Shiba Inu"){
      doc.parent = Features.findOne({title: 'Dog'})._id
    }

    if(doc.title == "Tiger"){
      doc.parent = Features.findOne({title: 'Feline'})._id
    }

    if(doc.title == "House Cat"){
      doc.parent = Features.findOne({title: 'Feline'})._id
    }

    Features.insert(doc);

  }
});
