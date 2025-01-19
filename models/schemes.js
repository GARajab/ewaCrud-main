import { mongoose, model, Schema } from "mongoose"

const schemeSchema = new mongoose.Schema({
  Sch_Ref: { type: String, require: true },
  Job_no: { type: String, require: true },
  APPNUMBER: { type: String, require: true },
  BLK: { type: String, require: true },
  SUPERVISOR: { type: String, require: true },
  ContractorName: { type: String, require: true },
  Title1: { type: String, require: true },
  STATUS: { type: String, require: true },
  PERCENTAGE: { type: Number, require: true },
  DATE_OF_COMPLETE: { type: Date, require: true },
  NUMBEROFSS: { type: Number, require: true },
  APPSTATUS: { type: String, require: true },
  DATEOFMEASUREMENT: { type: Date, require: true },
  CONTRACTORAPPRAISAL: { type: Number, require: true },
  AREA: { type: String, require: true },
  TYPE: { type: String, require: true },
})

const Scheme = mongoose.model("Scheme", schemeSchema)
export default Scheme
