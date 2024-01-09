// TagDropdown.tsx

import { Form } from 'react-bootstrap';

interface Tag {
  id: number;
  tagName: string;
}

interface TagDropdownProps {
  tags: Tag[];
  onSelectTag: (tagId: number) => void;
}

const TagDropdown: React.FC<TagDropdownProps> = ({ tags, onSelectTag }) => (
  <Form.Group controlId="tagDropdown">
    <Form.Label>Filter by Tag:</Form.Label>
    <Form.Control as="select" onChange={(e) => onSelectTag(Number(e.target.value))}>
      <option value="">All Tags</option>
      {tags.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.tagName}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);

export default TagDropdown;
