import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// add new item
export const createItem = async ({
  name,
  catalogId,
  categoryId,
  quantity,
  price,
}: Omit<Item,"id">) => {
  console.log("------repository:createItem---------")

  try {
    const newItem = await prisma.item.create({
      data: {
        name: name,
        quantity: quantity,
        price: price,
        catalogId: catalogId,
        categoryId: categoryId,
      },
    });
    return newItem;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// find by id
export const findItem = async (itemID: string) => {
  console.log("------repository:findItem---------")

  try {
    return await prisma.item.findUnique({
      where: { id: itemID },
    });
  } catch (error) {
    console.error("Error finding item:", error);
    throw error;
  }
};

// get items by any filteration criteria and using pagniation
export const findItems = async ({
  page,
  pageSize,
  minPrice,
  maxPrice,
  catalogId,
  categoryId,
}: FindItemsParams) => {
  console.log("------repository:findItems---------")

  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build the where clause dynamically
    const whereClause: any = {};
    if (minPrice !== undefined) {
      whereClause.price = {
        gte: minPrice,
      };
    }
    if (maxPrice !== undefined) {
      if (!whereClause.price) {
        whereClause.price = {};
      }
      whereClause.price.lte = maxPrice;
    }
    if (catalogId) {
      whereClause.catalogId = catalogId;
    }
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const items = await prisma.item.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: {
        price: "asc",
      },
    });

    const totalItems = await prisma.item.count({
      where: whereClause,
    });

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error finding items:", error);
    throw error;
  }
};

// update existing item
export const updateItem = async ({
  id,
  name,
  catalogId,
  categoryId,
  quantity,
  price,
}: Item) => {
  console.log("------repository:updateItem---------")

  try {
    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        name,
        catalogId,
        categoryId,
        quantity,
        price,
      },
    });
    return updatedItem;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// delete an item
export const deleteItem = async (itemId: string) => {
  console.log("------repository:deleteItem---------")

  try {
    const deletedItem = await prisma.item.delete({
      where: { id: itemId },
    });
    return deletedItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};