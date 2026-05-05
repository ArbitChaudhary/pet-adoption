import { Pet } from "./pet.model.ts";

export async function migrateData() {
  try {
    await Pet.updateMany(
      {
        isAdopted: { $exists: false },
      },
      {
        $set: { isAdopted: false },
      },
    );
  } catch (error) {
    console.log("Data migration failed", error);
  }
}
