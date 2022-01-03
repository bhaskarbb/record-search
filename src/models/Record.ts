import mongoose from 'mongoose';

export const RecordSchema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number],
});

RecordSchema.index({ createdAt: -1 });

const RecordModel = mongoose.model('Record', RecordSchema);
export { RecordModel };
