import { BigInt } from "@graphprotocol/graph-ts"
import { Contract, Approval, Transfer } from "../generated/Contract/Contract"
import { ApprovalRequest, TransferRequest, User } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let approval = new ApprovalRequest(event.transaction.hash.toHex())
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.value = event.params.value
  approval.block = event.block.number
  approval.timestamp = event.block.timestamp
  approval.save()

  let contract = Contract.bind(event.address)

  let user_a = new User(event.params.owner.toHex())
  user_a.balance = contract.balanceOf(event.params.owner)
  user_a.save()
  
  let user_b = new User(event.params.spender.toHex())
  user_b.balance = contract.balanceOf(event.params.spender)
  user_b.save()
}

export function handleTransfer(event: Transfer): void {
  let transfer = new TransferRequest(event.transaction.hash.toHex())
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.value = event.params.value
  transfer.block = event.block.number
  transfer.timestamp = event.block.timestamp
  transfer.save()
}
