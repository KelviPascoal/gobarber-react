import { Container } from './styles'

interface TooltipProps {
    title: string;
    children: any;
    className?: string;
}

export const Tooltip = ({ title, children, className }: TooltipProps) => {
    return (
    <Container className={className}>
        {children}
        <span>{title}</span>
    </Container>
    )
}