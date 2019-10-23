import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType } from 'nexus'

const Item = objectType({
  name: 'Item',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.purchaseDate()
    t.model.name()
    t.model.type()
    t.model.locatedIn()
    t.model.invoice()
    t.model.price()
  }
})

const Invoice = objectType({
  name: 'Invoice',
  definition(t) {
    t.model.id()
    t.model.date()
    t.model.items()
  }
})

const ItemType = objectType({
  name: 'ItemType',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.items()
  }
})

const Room = objectType({
  name: 'Room',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.items()
    t.model.floor()
    t.model.meetingRoom()
  }
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.item()
    t.crud.items()
    t.crud.itemType()
    t.crud.itemTypes()
    t.crud.invoice()
    t.crud.invoices()
    t.crud.room()
    t.crud.rooms()
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneItem()
    t.crud.createOneItemType()
    t.crud.createOneInvoice()
    t.crud.createOneRoom()
    t.crud.updateOneItem()
    t.crud.updateOneItemType()
    t.crud.updateOneInvoice()
    t.crud.updateOneRoom()
    t.crud.deleteOneItem()
    t.crud.deleteOneItemType()
    t.crud.deleteOneInvoice()
    t.crud.deleteOneRoom()
    t.crud.updateManyItem()
    t.crud.updateManyItemType()
    t.crud.updateManyInvoice()
    t.crud.updateManyRoom()
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Invoice, Item, ItemType, Room],
  outputs: true,
  plugins: [nexusPrismaPlugin()],
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
