// item repo methods
import {
  createItem,
  findItem,
  findItems,
  updateItem,
  deleteItem,
} from "../repositories/item.Repo";

export const CreateItemService = async ({
  name,
  catalogId,
  categoryId,
  quantity,
  price,
}: Omit<Item, "id">) => {
  console.log("------service:CreateItemService---------");
  try {
    return await createItem({ name, catalogId, categoryId, quantity, price });
  } catch (err) {
    throw err;
  }
};

// get item by id
export const findItemService = async (itemID: string) => {
  console.log("------service:findItemService---------");

  try {
    return await findItem(itemID);
  } catch (err) {
    throw err;
  }
};

// get items by filterations
export const findItemsService = async (filters: FindItemsParams) => {
  console.log("------service:findItemsService---------");

  try {
    return await findItems(filters);
  } catch (err) {
    throw err;
  }
};

// update item
export const updateItemService = async (updatedItemFields: Item) => {
  console.log("------service:updateItemService---------");

  try {
    return await updateItem(updatedItemFields);
  } catch (err) {
    throw err;
  }
};

// delete item
export const deleteItemService = async (itemID: string) => {
  console.log("------service:deleteItemService---------");

  try {
    return await deleteItem(itemID);
  } catch (err) {
    throw err;
  }
};
