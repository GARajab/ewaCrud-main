import { mongoose, model, Schema } from "mongoose"

const schemeSchema = new mongoose.Schema({
  Sch_Ref: { type: String, require: true },
  Job_no: { type: String, require: true },
  APPNUMBER: { type: String, require: true },
  BLK: { type: String, require: true },
  SUPERVISOR: { type: String, require: true },
  Contractor_Name: { type: String, require: true },
  Title1: { type: String, require: true },
  STATUS: { type: String, require: true },
  PERCENTAGE: { type: Number, require: true },
  DATE_OF_COMPLETED: { type: Date, require: true },
  NUMBEROFSS: { type: Number, require: true },
  APPSTATUS: { type: String, require: true },
  DATEOFMEASUREMENT: { type: Date, require: true },
  CONTRACTORAPPRAISAL: { type: Number, require: true },
  AREA: { type: String, require: true },
  TYPE: { type: String, require: true },
  contractorRemarks: { type: String },
  Rcvd_Date: { type: Date, require: true },
  APPNUMBER: { type: String, require: true },
  NUMBEROFSS: { type: String, require: true },
  REMARKS: { type: String, require: true },
  AREA: { type: String, require: true },
  labCost: { type: Number, require: true },
  matCost: { type: Number, require: true },
  PO_NUMBER: { type: Number, require: true },
  IO: { type: Number, require: true },
  totalCost: { type: Number, require: true },
  IUWR_NUMBER: { type: String, require: true },
})

const Scheme = mongoose.model("Scheme", schemeSchema)
export default Scheme
