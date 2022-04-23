// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.5 <0.9.0;


contract FileStorage {
    struct FileMetaData {
        string fileId;
        string fileName;
        string fileType;
        uint256 fileSize;
        string fileOwner;
        uint256 fileCreated;
    }

    // store the file metadata with user's address
    mapping(address => FileMetaData[]) _files;

    // store the file data with fileId
    function addFile(FileMetaData memory file) public {
        _files[msg.sender].push(file);
    }

    // delete file by index
    function deleteFile(uint256 index) public{
         if (index < _files[msg.sender].length) {
           for (uint i = index; i < _files[msg.sender].length - 1; i++){
               _files[msg.sender][i] = _files[msg.sender][i + 1];
           }
           _files[msg.sender].pop();
         } 
    }

    // get list of _files in range of [start, end)
    function getFilesInRange(uint256 start, uint256 end)
        public
        view
        returns (FileMetaData[] memory)
    {
        uint256 max = end;
        if (max > _files[msg.sender].length) {
            max = _files[msg.sender].length;
        }
        uint256 itemCount = max - start;
        FileMetaData[] memory results = new FileMetaData[](itemCount);
        uint256 index = 0;
        for (uint256 i = start; index < itemCount; i++) {
            results[index] = _files[msg.sender][i];
            index += 1;
        }
        return results;
    }

    // get _files count
    function getFileSize() public view returns (uint256) {
        return _files[msg.sender].length;
    }
}
