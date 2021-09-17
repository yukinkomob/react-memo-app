import React from 'react';
import { useHistory } from 'react-router';

function List() {
  return (
    <div>
      <button type="button" onClick={useHistory().goBack}>戻る</button>
    </div>
  );
}

export default List;
