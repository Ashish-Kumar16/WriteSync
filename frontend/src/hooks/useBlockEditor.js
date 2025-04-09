
import { useState, useCallback } from 'react';

export const useBlockEditor = (initialBlocks = []) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const generateId = () => {
    return `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const addBlock = useCallback((type = 'paragraph', afterId) => {
    const newBlock = {
      id: generateId(),
      type,
      content: '',
    };
    
    setBlocks(prevBlocks => {
      if (!afterId) {
        return [...prevBlocks, newBlock];
      }
      
      const index = prevBlocks.findIndex(block => block.id === afterId);
      if (index === -1) return [...prevBlocks, newBlock];
      
      const newBlocks = [...prevBlocks];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });
    
    return newBlock.id;
  }, []);

  const updateBlock = useCallback((id, data) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id ? { ...block, ...data } : block
      )
    );
  }, []);

  const removeBlock = useCallback((id) => {
    setBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
  }, []);

  const changeBlockType = useCallback((id, newType) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id ? { ...block, type: newType } : block
      )
    );
  }, []);

  const moveBlockUp = useCallback((id) => {
    setBlocks(prevBlocks => {
      const index = prevBlocks.findIndex(block => block.id === id);
      if (index <= 0) return prevBlocks;
      
      const newBlocks = [...prevBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index - 1];
      newBlocks[index - 1] = temp;
      
      return newBlocks;
    });
  }, []);

  const moveBlockDown = useCallback((id) => {
    setBlocks(prevBlocks => {
      const index = prevBlocks.findIndex(block => block.id === id);
      if (index === -1 || index >= prevBlocks.length - 1) return prevBlocks;
      
      const newBlocks = [...prevBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + 1];
      newBlocks[index + 1] = temp;
      
      return newBlocks;
    });
  }, []);

  return {
    blocks,
    setBlocks,
    selectedBlockId,
    setSelectedBlockId,
    addBlock,
    updateBlock,
    removeBlock,
    changeBlockType,
    moveBlockUp,
    moveBlockDown
  };
};
