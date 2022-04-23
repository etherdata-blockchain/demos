import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import moment from "moment";

describe("Given a file storage contract", function () {
  it("Should return correct number of files", async function () {
    const Storage = await ethers.getContractFactory("FileStorage");
    const storageContract = await Storage.deploy();
    await storageContract.deployed();

    expect(await storageContract.getFileSize()).to.equal(0);
    const tx = await storageContract.addFile({
      fileId: "mock_id",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    await tx.wait();

    expect(await storageContract.getFileSize()).to.equal(1);
  });

  it("Should delete correctly", async function () {
    const Storage = await ethers.getContractFactory("FileStorage");
    const storageContract = await Storage.deploy();
    await storageContract.deployed();

    expect(await storageContract.getFileSize()).to.equal(0);
    const tx1 = await storageContract.addFile({
      fileId: "mock_id",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    const tx2 = await storageContract.addFile({
      fileId: "mock_id_2",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    const tx3 = await storageContract.addFile({
      fileId: "mock_id_3",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    await Promise.all([tx1.wait(), tx2.wait(), tx3.wait()]);

    expect(await storageContract.getFileSize()).to.equal(3);
    const deleteTx = await storageContract.deleteFile(BigNumber.from(1));
    await deleteTx.wait();

    expect(await storageContract.getFileSize()).to.equal(2);
    let files = await storageContract.getFilesInRange(0, 2);
    expect(files).to.lengthOf(2);
    expect(files[0].fileId).to.equal("mock_id");
    expect(files[1].fileId).to.equal("mock_id_3");
  });

  it("Should delete correctly", async function () {
    const Storage = await ethers.getContractFactory("FileStorage");
    const storageContract = await Storage.deploy();
    await storageContract.deployed();

    expect(await storageContract.getFileSize()).to.equal(0);
    const tx1 = await storageContract.addFile({
      fileId: "mock_id",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    const tx2 = await storageContract.addFile({
      fileId: "mock_id_2",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    const tx3 = await storageContract.addFile({
      fileId: "mock_id_3",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    await Promise.all([tx1.wait(), tx2.wait(), tx3.wait()]);

    expect(await storageContract.getFileSize()).to.equal(3);
    let deleteTx = await storageContract.deleteFile(BigNumber.from(1));
    await deleteTx.wait();

    deleteTx = await storageContract.deleteFile(BigNumber.from(1));
    await deleteTx.wait();

    deleteTx = await storageContract.deleteFile(BigNumber.from(0));
    await deleteTx.wait();

    expect(await storageContract.getFileSize()).to.equal(0);
  });

  it("Should return correct range of files", async function () {
    const Storage = await ethers.getContractFactory("FileStorage");
    const storageContract = await Storage.deploy();
    await storageContract.deployed();

    const tx1 = await storageContract.addFile({
      fileId: "mock_id",
      fileName: "mock",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    const tx2 = await storageContract.addFile({
      fileId: "mock_id_2",
      fileName: "mock_2",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    const tx3 = await storageContract.addFile({
      fileId: "mock_id_3",
      fileName: "mock_3",
      fileType: ".jpg",
      fileSize: BigNumber.from(20).toString(),
      fileOwner: "mock_user",
      fileCreated: BigNumber.from(moment().valueOf()).toString(),
    });

    await Promise.all([tx1.wait(), tx2.wait(), tx3.wait()]);

    let files = await storageContract.getFilesInRange(0, 1);
    expect(files).to.lengthOf(1);
    expect(files[0].fileId).to.equal("mock_id");

    files = await storageContract.getFilesInRange(0, 2);
    expect(files).to.lengthOf(2);
    expect(files[0].fileId).to.equal("mock_id");
    expect(files[1].fileId).to.equal("mock_id_2");

    files = await storageContract.getFilesInRange(0, 3);
    expect(files).to.lengthOf(3);
    expect(files[0].fileId).to.equal("mock_id");
    expect(files[1].fileId).to.equal("mock_id_2");
    expect(files[2].fileId).to.equal("mock_id_3");

    files = await storageContract.getFilesInRange(0, 4);
    expect(files).to.lengthOf(3);
    expect(files[0].fileId).to.equal("mock_id");
    expect(files[1].fileId).to.equal("mock_id_2");
    expect(files[2].fileId).to.equal("mock_id_3");

    files = await storageContract.getFilesInRange(1, 3);
    expect(files).to.lengthOf(2);
    expect(files[0].fileId).to.equal("mock_id_2");
    expect(files[1].fileId).to.equal("mock_id_3");

    files = await storageContract.getFilesInRange(1, 4);
    expect(files).to.lengthOf(2);
    expect(files[0].fileId).to.equal("mock_id_2");
    expect(files[1].fileId).to.equal("mock_id_3");

    files = await storageContract.getFilesInRange(2, 4);
    expect(files).to.lengthOf(1);
    expect(files[0].fileId).to.equal("mock_id_3");

    files = await storageContract.getFilesInRange(3, 4);
    expect(files).to.lengthOf(0);
  });
});
